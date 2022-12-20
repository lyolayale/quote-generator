import QuoteText from "./QuoteText";
import QuoteAuthor from "./QuoteAuthor";
import QuoteInteractives from "./QuoteInteractives";

function QuoteList(props) {
  return (
    <section id="quote-wrapper" className="quote-wrapper">
      <div id="quote-container" className="quote-container">
        <QuoteText quote={props.quote} />
        <QuoteAuthor author={props.author} />
        <QuoteInteractives
          handleTweetQuote={props.handleTweetQuote}
          handleRenderQuote={props.handleRenderQuote}
        />
      </div>
    </section>
  );
}

export default QuoteList;
