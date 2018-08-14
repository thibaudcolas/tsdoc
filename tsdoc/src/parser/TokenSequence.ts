import { ParserContext } from './ParserContext';
import { Token } from './Token';

/**
 * Constructor parameters for {@link TokenSequence}
 */
export interface ITokenSequenceParameters {
  parserContext: ParserContext;
  startIndex: number;
  endIndex: number;
}

/**
 * Represents a sequence of tokens extracted from `ParserContext.tokens`.
 * This sequence is defined by a starting index and ending index into that array.
 */
export class TokenSequence {
  /**
   * The associated parser context that the tokens come from.
   */
  public readonly parserContext: ParserContext;

  private _startIndex: number;
  private _endIndex: number;

  /**
   * Constructs a TokenSequence object with no tokens.
   */
  public static createEmpty(parserContext: ParserContext): TokenSequence {
    return new TokenSequence({ parserContext, startIndex: 0, endIndex: 0 });
  }

  public constructor(parameters: ITokenSequenceParameters) {
    this.parserContext = parameters.parserContext;
    this._startIndex = parameters.startIndex;
    this._endIndex = parameters.endIndex;
    this._validateBounds();
  }

  /**
   * The starting index into the associated `ParserContext.tokens` list.
   */
  public get startIndex(): number {
    return this._startIndex;
  }

  /**
   * The (non-inclusive) ending index into the associated `ParserContext.tokens` list.
   */
  public get endIndex(): number {
    return this._endIndex;
  }

  public get tokens(): ReadonlyArray<Token> {
    return this.parserContext.tokens.slice(this._startIndex, this._endIndex);
  }

  public isEmpty(): boolean {
    return this._startIndex === this._endIndex;
  }

  /**
   * Returns the concatenated text of all the tokens.
   */
  public toString(): string {
    return this.tokens.map(x => x.toString()).join('');
  }

  private _validateBounds(): void {
    if (this.startIndex < 0) {
      throw new Error('TokenSequence.startIndex cannot be negative');
    }
    if (this.endIndex < 0) {
      throw new Error('TokenSequence.endIndex cannot be negative');
    }
    if (this.endIndex < this.startIndex) {
      throw new Error('TokenSequence.endIndex cannot be smaller than TokenSequence.startIndex');
    }
    if (this.startIndex > this.parserContext.tokens.length) {
      throw new Error('TokenSequence.startIndex cannot exceed the associated token array');
    }
    if (this.endIndex > this.parserContext.tokens.length) {
      throw new Error('TokenSequence.endIndex cannot exceed the associated token array');
    }
  }
}
