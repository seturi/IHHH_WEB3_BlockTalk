import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login, Main } from "./pages/Pages";
import "./styles/style.css";
import "./styles/animation.css";

const App = () => {
	const isLoggedIn = useSelector(state => state.account.isLoggedIn);

  	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Routes>
				<Route path=""
					element={ <Login /> }/>
				<Route path="main"
					element={isLoggedIn ? <Main /> 
					: <Navigate to="" />} />
			</Routes>
		</BrowserRouter>
  	);
};


export default App;