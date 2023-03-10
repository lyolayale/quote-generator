import React from "react";
import QuoteList from "./components/QuoteList";
import Loader from "./components/Loader";

import "./main.css";
import "./normalize.css";

class App extends React.Component {
  state = {
    quotes: [],
    quote: "",
    author: "",
    isMounted: true,
  };

  componentDidMount = async () => {
    if (this.state.isMounted) {
      this.setState({
        quote:
          "What you are is what you have been. What you'll be is what you do now",
      });
      this.setState({ author: "Buddha" });

      this.handleShowLoading();

      setTimeout(() => {
        this.handleHideLoading();
      }, 500);

      try {
        const res = await fetch(
          "https://jacintodesign.github.io/quotes-api/data/quotes.json"
        );
        const data = await res.json();
        this.setState({ quotes: data });
      } catch (err) {
        console.error(err);
        this.handleShowLoading();
      }
    } else {
      this.handleShowLoading();
    }
  };

  componentWillUnmount = () => {
    this.setState({ isMounted: false });
    this.setState({ quotes: [] });
  };

  handleFadeIn = () => {
    const quoteWrapper = document.getElementById("quote-wrapper");
    quoteWrapper.classList.add("fade-in");
  };

  handleRemoveFadeIn = () => {
    const quoteWrapper = document.getElementById("quote-wrapper");
    quoteWrapper.classList.remove("fade-in");
  };

  handleRenderQuote = () => {
    const quoteText = document.getElementById("quote");
    const randomQuote =
      this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)];

    if (!randomQuote.author || randomQuote.author === "") {
      randomQuote.author = "Unknown Author";
    }

    if (randomQuote.text.length > 150) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    this.setState({ quote: randomQuote.text });
    this.setState({ author: randomQuote.author });
    this.handleFadeIn();
    console.log(randomQuote.text.length); // Length of quote
    setTimeout(() => {
      this.handleRemoveFadeIn();
    }, 1200);
  };

  handleTweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${this.state.quote} - ${this.state.author}`;
    window.open(twitterUrl, "_blank");
  };

  handleShowLoading = () => {
    const loader = document.getElementById("loader");
    const quoteWrapper = document.getElementById("quote-wrapper");

    loader.classList.remove("hide");
    quoteWrapper.classList.add("hide");
  };

  handleHideLoading = () => {
    const loader = document.getElementById("loader");
    const quoteWrapper = document.getElementById("quote-wrapper");

    loader.classList.add("hide");
    quoteWrapper.classList.remove("hide");
  };

  render() {
    return (
      <main id="main">
        <QuoteList
          quote={this.state.quote}
          author={this.state.author}
          handleTweetQuote={this.handleTweetQuote}
          handleRenderQuote={this.handleRenderQuote}
        />
        <Loader />
      </main>
    );
  }
}

export default App;
