// SPDX-License-Identifier: GPL-3.0


pragma solidity >=0.7.0 <0.9.0;

contract Database {
    struct user {
        string name;
        friend[] friendList;
    }

    struct friend {
        address publickey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct Wallet {
        address walletAddress;
        bytes7 key;
        uint256 timestamp;
    }
    
    mapping(bytes7 => Wallet) wallets; // key -> wallet
    mapping(address => uint256) recentKeyGenerate;
    mapping(address => bytes7) recentKey;
    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages; // Hash(user1, user2)
    
    event KeyGenerated(bytes7 indexed key, address indexed walletAddress);
    
    function bytes7ToString(bytes7 data) internal pure returns (string memory) {
        bytes memory byteArray = new bytes(7);
        for (uint i = 0; i < 7; i++) {
            byteArray[i] = data[i];
        }
        return string(byteArray);
    }

    function stringToBytes7(string memory str) internal pure returns (bytes7) {
        require(bytes(str).length == 7, "String must be exactly 7 characters");
        
        bytes7 result;
        for (uint i = 0; i < 7; i++) {
            result |= bytes7(bytes(str)[i]) >> (i * 8);
        }
        return result;
    }


    function generateKey() internal returns (bytes7) {
        /**
        * 랜덤한 7자리 연결 코드를 생성합니다.
        * 키 생성마다 recentKeyGenerate 매핑에 timestamp를 추가합니다.
        * timestamp를 비교하여 생성 시점에서 유효한 코드가 있는지 검사할 수 있습니다.
        * 만약 유효한 코드가 있다면, 새로 생성하지 않고 원래 코드를 반환합니다.
        *
        * @return   key     7자리의 연결 코드입니다.
        * @todo     이미 유효한 코드가 있다면, 그 코드를 삭제하고 새 코드를 발행할 수도 있습니다.
        *           보안을 위해 적절한 방법을 더 연구해야 합니다.
        */
        if (recentKeyGenerate[msg.sender] != 0 && recentKeyGenerate[msg.sender] > block.timestamp - 600){
            return recentKey[msg.sender];
        }

        bytes7 key = generateRandomKey();
        wallets[key] = Wallet(msg.sender, key, block.timestamp);
        emit KeyGenerated(key, msg.sender);
        recentKeyGenerate[msg.sender] = block.timestamp;
        recentKey[msg.sender] = key;
        return key;
    }

    function generateKeyString() external returns (string memory) {
        bytes7 bkey = generateKey();
        string memory key = bytes7ToString(bkey);
        return key;
    }

    function addFriendbyCode(string memory key) external {
        address faddress = checkKey(stringToBytes7(key));
        string memory fname = getUsername(faddress);

        addFriend(faddress, fname);
    }

    
    function checkKey(bytes7 _key) internal view returns (address) {
        /**
        * 연결 코드의 유효성을 검사하고, 유효하다면 매핑된 address를 반환합니다.
        *
        * @param    _key    7자리의 연결 코드입니다.
        * @return   address 코드를 생성한 유저의 지갑 주소입니다.
        */
        Wallet memory wallet = wallets[_key];
        require(wallet.walletAddress != address(0), "Invalid key");
        require(block.timestamp - wallet.timestamp <= 600, "Key expired");
        return wallet.walletAddress;
    }
    
    function generateRandomKey() private view returns (bytes7) {
        /**
        * 영어 대문자와 숫자로 이루어진 7자리 연결 코드를 랜덤하게 생성합니다.
        *
        * @return   _key    7자리의 연결 코드입니다.
        */
        bytes7 result;
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)));

        for (uint256 i = 0; i < 7; i++) {
            uint256 randomIndex = (randomNumber >> (i * 8)) & 0xff; // Get 8-bit random number
            uint256 characterIndex = randomIndex % 36; // 26 for letters, 10 for digits

            if (characterIndex < 26) {
                result |= bytes7(bytes1(uint8(65 + characterIndex))) >> (i * 8); // Convert to uppercase letter (ASCII)
            } else {
                result |= bytes7(bytes1(uint8(48 + (characterIndex - 26)))) >> (i * 8); // Convert to digit (ASCII)
            }
        }

        return result;
    }

    function checkUserExists(address publickey) public view returns(bool) {
        return bytes(userList[publickey].name).length > 0;
    }

    function createAccount(string calldata name) external {
        /**
        * 유저의 이름을 userList 매핑에 저장합니다.
        *
        * @param    name    계정의 이름
        * @todo     설정된 name을 바꾸는 기능 추가
        */
        require(checkUserExists(msg.sender) == false, "User already exists!");
        require(bytes(name).length > 0, "Username cannot be empty!");

        userList[msg.sender].name = name;
    }

    function getUsername(address publickey) public view returns(string memory) {
        require(checkUserExists(publickey), "User is not registered!");
        return userList[publickey].name;
    }

    function addFriend(address friendkey, string memory name) public {
        /**
        * 다른 유저의 지갑 주소를 받아 친구로 추가합니다.
        * msg.sender -> friendkey와 friendkey -> msg.sender 관계를 모두 만들어줍니다.
        *
        * @param    friendkey   친구로 추가할 지갑 주소
        * @param    name        친구의 이름
        */
        require(checkUserExists(msg.sender), "Create an account first!");
        require(checkUserExists(friendkey), "User is not registered!");
        require(msg.sender != friendkey, "Users cannot add themselves as friends!");
        require(checkAlreadyFriends(msg.sender, friendkey)==false, "These users are already friends!");

        _addFriend(msg.sender, friendkey, name);
        _addFriend(friendkey, msg.sender, userList[msg.sender].name);
    }

    function checkAlreadyFriends(address publickey1, address publickey2) internal view returns(bool) {
        
        if(userList[publickey1].friendList.length > userList[publickey2].friendList.length)
        {
            (publickey1, publickey2) = (publickey2, publickey1);
        }
    
        for(uint i=0; i<userList[publickey1].friendList.length; ++i)
        {
            if(userList[publickey1].friendList[i].publickey == publickey2)
                return true;
        }
        return false;
    }

    function _addFriend(address me, address friendkey, string memory name) internal {
        friend memory newFriend = friend(friendkey, name);
        userList[me].friendList.push(newFriend);
    }

    function getMyFriendList() external view returns(friend[] memory) {
        return userList[msg.sender].friendList;
    }

    function _getChatCode(address publickey1, address publickey2) internal pure returns(bytes32) {
        if (publickey1 < publickey2)
            return keccak256(abi.encodePacked(publickey1, publickey2));
        else
            return keccak256(abi.encodePacked(publickey2, publickey1));
    }

    function sendMessage(address friendkey, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first!");
        require(checkUserExists(friendkey), "User is not registered!");
        require(checkAlreadyFriends(msg.sender,friendkey), "You are not friends with the given user");
        
        bytes32 chatCode = _getChatCode(msg.sender, friendkey);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    function readMessage(address friendkey) external view returns(message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friendkey);
        return allMessages[chatCode];
    }
}