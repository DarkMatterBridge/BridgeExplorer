import {PBNObject} from "../model/PBNObject";
import {Board} from "../model/Board";

export class BoardFactory {

  static generateFromPBN(p: PBNObject): Board {
    let board = new Board();
    let hands = PBNObject.hands(p.deal);
    let direction = p.deal.substr(0, 1);
    let dirNum = direction.getDirectionNo();
    board.westHand.setHandFromPBNString(hands[(4 + 1 - dirNum) % 4]);
    board.northHand.setHandFromPBNString(hands[(4 + 2 - dirNum) % 4]);
    board.eastHand.setHandFromPBNString(hands[(4 + 3 - dirNum) % 4]);
    board.southHand.setHandFromPBNString(hands[(4 + 0 - dirNum) % 4]);

    board.players = [p.south, p.west, p.north, p.east];

    board.biddingSequence.dealer = p.contentFor("Dealer");

    board.biddingSequence.bids =
      p.bidding.split(/[\n\s]/).filter(x => x.length > 0).map(x => x == "Pass" ? 'P' : x);
    return board;
  }

}
