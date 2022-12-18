import React from "react";

import "./main.css";
import "./normalize.css";

class App extends React.Component {
  state = {
    quotes: [],
    quote: "",
    author: "",
    loader: document.getElementById("loader"),
    quoteWrapper: document.getElementById("quote-wrapper"),
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
    console.log(randomQuote.text.length); // Length of quote
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
        <section id="quote-wrapper" className="quote-wrapper">
          <div id="quote-container" className="quote-container">
            <section className="quote-text">
              <i className="fa-solid fa-quote-left"></i>
              <span id="quote">{this.state.quote}</span>
              <i className="fa-solid fa-quote-right"></i>
            </section>
            <section className="author">
              <span id="author">{this.state.author}</span>
            </section>
            <section className="buttons">
              <button
                onClick={this.handleTweetQuote}
                className="twitter-btn"
                id="twitter"
                title="Tweet This!"
              >
                <i className="fab fa-twitter"></i>
              </button>
              <button onClick={this.handleRenderQuote} id="new-quote">
                New Quote
              </button>
            </section>
          </div>
        </section>
        <section id="loader" className="loader"></section>
      </main>
    );
  }
}

export default App;
