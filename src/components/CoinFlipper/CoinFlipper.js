import React, { Component } from "react";
import Coin from "../Coin/Coin";
import "./CoinFlipper.css";

class CoinFlipper extends Component {
  constructor(props) {
    super(props);
    // State üzerinde paranın başlangıçtaki durumunu veriyoruz, başlangıçta "tura" olsun.
    // Daha sonra şu anda paranın dönüp dönmeme durumunu da veriyoruz, başlangıçta para atılmamış olduğundan "false" olarak verdik.
    this.state = {
      side: "tura",
      flipping: false,
      tossTime: 0,
      random: 0,
      yazi: 0,
      tura: 0,
    };
    this.randomNumber = this.randomNumber.bind(this);
    this.currentSide = this.currentSide.bind(this);
    this.numberOfSide = this.numberOfSide.bind(this);
  }
  randomNumber = () => {
    return Math.round(Math.random());
  };

  currentSide = () => {
    if (this.state.random === 0) {
      return "tura";
    } else if (this.state.random === 1) {
      return "yazi";
    }
  };

  numberOfSide = () => {};

  handleClick = () => {
    // "At" butonuna tıkladığımızda toplam atış sayısını tutmak için tossTime değerini 1 arttırıyoruz.
    this.setState((prevState) => {
      return {
        ...prevState,
        flipping: true,
        tossTime: prevState.tossTime + 1,
        random: this.randomNumber(),
        side: this.currentSide(),
      };
    });
    console.log(this.state.random);
    console.log(this.state.side);
    console.log(this.state.yazi);
    console.log(this.state.tura);
    // 1 saniye kadar dönmesi yeterli, bu yüzden 1 saniye sonra "flipping" durmunu tekrar "false" yapıyoruz.
    setTimeout(() => this.setState({ flipping: false }), 1000);
    if (this.state.random === 0) {
      this.setState((prevState) => {
        return {
          tura: prevState.tura + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          yazi: prevState.yazi + 1,
        };
      });
    }
  };

  render() {
    return (
      <div className="CoinFlipper">
        <h1>Yazı mı Tura mı?</h1>
        <Coin side={this.state.side} flipping={this.state.flipping} />
        <button onClick={this.handleClick}>At!</button>
        <p>
          Toplam
          <strong> {this.state.tossTime} </strong>
          atıştan
          <strong> {this.state.tura} </strong>ü tura
          <strong> {this.state.yazi} </strong>
          si yazı geldi.
        </p>
      </div>
    );
  }
}

export default CoinFlipper;
