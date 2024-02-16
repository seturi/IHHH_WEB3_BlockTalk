* 구현하면서 필요해 보이는 것이나 문제점을 적어놨습니다.
1. 벡터 이미지 수직 중앙 정렬이 제대로 이뤄지지 않습니다(add, refresh, send).
2. 백그라운드, ChatCardPanel, ChatCard, MessagePanel, Message 색 바꾸는 게 좋을 듯 합니다.
3. Message 좌, 우 정렬 구현해야 하고, Message 색도 다르면 좋을 것 같습니다.
4. 카카오톡처럼 같은 사람이 연속으로 보내면 이름 생략, 보여지는 시간이 같으면 최하단 메시지만 시간 출력하도록 구현할 수 있으면 좋을 것 같습니다.
5. Avalanche faucet은 받는 데 제한이 있는 것 같습니다. 저는 Sepolia 채널 이용했습니다. </br>
https://www.alchemy.com/faucets/ethereum-sepolia <br/>
스마트 컨트랙트 배포하시면 remix나 etherscan에서 contract address를 확인하실 수 있습니다. 노션에 올라와 있는 문서의 로그인 부분을 그대로 옮겨온 상태라 App.jsx 파일에 CONTRACT_ADDRESS 채워주셔야 로그인됩니다.
6. 로그인 후 ChatCard를 선택하지 않은 상태에서는 MessagePanel에 채팅이 안 열려 있는 상태면 좋을 것 같습니다(해당 부분은 이미지라든지 제공해야 하는 정보를 띄워두면 좋을 것 같습니다.).
7. MessagePanel에 채팅이 안 열려있거나 Input에 아무 메시지도 없을 경우 send 버튼을 비활성화하면 좋을 것 같습니다.
8. Input에 커서가 없는 상태에서도 타이핑을 하면 문자가 입력되도록 하면 좋을 것 같습니다(구글링해보니 focus와 관련된 동작이라고 하는 것 같은데 정확히는 모르겠습니다.).
9. 본인의 주소를 복사하는 버튼을 구현하면 좋을 것 같습니다.