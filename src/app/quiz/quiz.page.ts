import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit {
  constructor(private route: ActivatedRoute, public qs: QuizService) {}

  ngOnInit() {}
}
