import { Component, OnInit } from '@angular/core';
import { Card } from "../../components/card/card.interface";
import { GameService } from "../../services/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  cardImages = [
    'angular',
    'd3',
    'jenkins',
    'postcss',
    'react',
    'redux',
    'sass',
    'splendex',
    'ts',
    'webpack'
  ];

  cards: Card[] = [];
  triesCount = 0;
  bestTriesCount = 0;
  size = this.gameService.size;

  private flippedCards: Card[] = [];
  private matchedCount = 0;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.cards = [];

    for (let i = 0; i < this.size / 2; i++) {
      const imageIndex = Math.floor(Math.random() * Math.floor(this.cardImages.length));

      const card: Card = {
        imageId: this.cardImages[imageIndex],
        state: 'default'
      };

      this.cards.push({...card});
      this.cards.push({...card});
    }

    this.cards = this.shuffleCards(this.cards);
  }

  shuffleCards(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length === 2) {
        this.triesCount++;
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();
    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.size / 2) {
          if (!this.bestTriesCount || this.bestTriesCount > this.triesCount) {
            this.bestTriesCount = this.triesCount;
          }
          if (confirm("You won! Do you want to start new game?")) {
            this.restart();
          }
        }
      }
    }, 1000);
  }

  restart() {
    this.matchedCount = 0;
    this.triesCount = 0;
    this.init();
  }
}
