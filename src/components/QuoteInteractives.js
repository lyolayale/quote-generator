function QuoteInteractives(props) {
  return (
    <section className="buttons">
      <button
        onClick={props.handleTweetQuote}
        className="twitter-btn"
        id="twitter"
        title="Tweet This!"
      >
        <i className="fab fa-twitter"></i>
      </button>
      <button onClick={props.handleRenderQuote} id="new-quote">
        New Quote
      </button>
    </section>
  );
}

export default QuoteInteractives;
