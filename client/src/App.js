import React from "react";
import axios from "axios";

import "./App.css";
import us from "./pics/us.svg";
import japan from "./pics/japan.svg";
import korea from "./pics/korea.svg";

class App extends React.Component {
    state = {
        fx: ""
    };

    async componentDidMount() {
        const res = await axios.get("/api/fx");
        this.setState({ fx: res.data });
    }
    render() {
        return this.state.fx !== "" ? (
            <div className="main-ctn">
                <div className="title-ctn">
                    <button className="ui green mini button">
                        Selling Rate
                    </button>
                    <b>Updated:</b> {new Date().toString()}
                </div>
                <div className="table-ctn">
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th className="four wide"> Currency </th>
                                <th className="three wide"> Superrich </th>
                                <th className="three wide">Bangkok Bank</th>
                                <th className="three wide"> Krungsri </th>
                                <th className="three wide"> SCB </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <h4 className="ui image header">
                                        <img
                                            src={us}
                                            className="ui mini rounded image"
                                            alt="currency"
                                        />
                                        <div className="content">
                                            USD
                                            <div className="sub header">
                                                US Dollar
                                            </div>
                                        </div>
                                    </h4>
                                </td>
                                <td>
                                    {Number(this.state.fx.superr.USD).toFixed(
                                        2
                                    )}
                                </td>
                                <td>
                                    {Number(this.state.fx.bbl.USD).toFixed(2)}
                                </td>
                                <td>
                                    {Number(this.state.fx.krungsri.USD).toFixed(
                                        2
                                    )}
                                </td>
                                <td>
                                    {Number(this.state.fx.scb.USD).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4 className="ui image header">
                                        <img
                                            src={japan}
                                            className="ui mini rounded image"
                                            alt="currency"
                                        />
                                        <div className="content">
                                            JPY
                                            <div className="sub header">
                                                Japanese Yen
                                            </div>
                                        </div>
                                    </h4>
                                </td>
                                <td>
                                    {Number(this.state.fx.superr.JPY).toFixed(
                                        2
                                    )}
                                </td>
                                <td>
                                    {Number(this.state.fx.bbl.JPY).toFixed(2)}
                                </td>
                                <td>
                                    {Number(this.state.fx.krungsri.JPY).toFixed(
                                        2
                                    )}
                                </td>
                                <td>
                                    {Number(this.state.fx.scb.JPY).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4 className="ui image header">
                                        <img
                                            src={korea}
                                            className="ui mini rounded image"
                                            alt="currency"
                                        />
                                        <div className="content">
                                            KRW
                                            <div className="sub header">
                                                Korean Won
                                            </div>
                                        </div>
                                    </h4>
                                </td>
                                <td>
                                    {Number(this.state.fx.superr.KRW).toFixed(
                                        2
                                    )}
                                </td>
                                <td>
                                    {Number(this.state.fx.bbl.KRW).toFixed(2)}
                                </td>
                                <td>
                                    {Number(this.state.fx.krungsri.KRW).toFixed(
                                        2
                                    )}
                                </td>
                                <td>
                                    {Number(this.state.fx.scb.KRW).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        ) : null;
    }
}

export default App;
