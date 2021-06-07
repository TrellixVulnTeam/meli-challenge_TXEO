import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/Header/Header";
import ResultadoList from "./components/Resultados/ResultadoList";
import Detalle from "./components/Detalle/Detalle";

const App = () => {

	return (
		<Router>
			<Provider store={store}>
				<Header />
				<div className="container">
					<Switch>
						<Route
							exact
							path={["/items:search?", "/items:q?"]}
							component={ResultadoList}
						/>
						<Route exact path="/items/:id" component={Detalle} />
					</Switch>
				</div>
			</Provider>
		</Router>
	);
};

export default App;
