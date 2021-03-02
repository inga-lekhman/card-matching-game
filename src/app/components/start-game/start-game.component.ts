import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GameService } from "../../services/game.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit {
  @Input() direction: string = 'column';
  tableSizes = this.gameService.sizes;
  startForm: FormGroup;
  selected = this.gameService.size;

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.startForm = new FormGroup({
      'size': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const { value } = this.startForm;
    this.gameService.setSize(value.size);

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['game']);
    });
  }
}
