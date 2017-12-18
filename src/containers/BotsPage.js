import React from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "../components/BotSpecs";

class BotsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      bots: [],
      myBots: [],
      renderCollection: true,
      botSpecs: {},
    }
  }

  seeAll = () => {
    this.setState({
      renderCollection: true,
    })
  }

  componentDidMount() {
    fetch('https://bot-battler-api.herokuapp.com/api/v1/bots')
    .then(resp => resp.json())
    .then(data => this.setState({ bots: data }))
  }

  handleClick = (selected) => {
    const { bots, myBots } = this.state;
    // console.log(if (myBots.map(bot => bot.id.includes(bots.filter(bot => bot.id === selected)))))
    if (!myBots.includes(bots.filter(bot => bot.id === selected))) {
      this.setState({
        myBots: [...this.state.myBots, this.state.bots.filter(bot => bot.id === selected)[0]]
      });
    }
  }

  renderSpecs = (selected) => {
    this.setState({ renderCollection: false })
    return (
      this.state.bots.forEach(bot => {
        if (bot.id === selected) {
          return this.setState({ botSpecs: bot })
        }
      })
    )
  }

  //start here with your code for step one

  render() {
    const { myBots, bots, renderCollection, botSpecs } = this.state;

    return (
      <div>
        <YourBotArmy myBots={myBots} />
        {renderCollection ?
        <BotCollection bots={bots} renderCollection={renderCollection} renderSpecs={this.renderSpecs} handleClick={this.handleClick} />
        :
        <BotSpecs handleClick={this.handleClick} seeAll={this.seeAll} bot={botSpecs}/>
        }
      </div>
    );
  }
}

export default BotsPage;
