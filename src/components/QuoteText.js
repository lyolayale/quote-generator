function QuoteText(props) {
  return (
    <section className="quote-text">
      <i className="fa-solid fa-quote-left"></i>
      <span id="quote">{props.quote}</span>
      <i className="fa-solid fa-quote-right"></i>
    </section>
  );
}

export default QuoteText;
