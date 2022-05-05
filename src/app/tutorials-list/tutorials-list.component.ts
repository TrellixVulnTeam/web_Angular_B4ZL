import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/data-doc.service';
import { map } from 'rxjs/operators';
import { Tutorial } from 'src/app/interfaces/tutorial.interface';
@Component({
    selector: 'app-tutorials-list',
    templateUrl: './tutorials-list.component.html',
    styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
    tutorials?: Tutorial[];
    currentTutorial?: Tutorial;
    currentIndex = -1;
    title = '';
    constructor(private tutorialService: TutorialService) { }
    ngOnInit(): void {
        this.retrieveTutorials();
    }
    refreshList(): void {
        this.currentTutorial = undefined;
        this.currentIndex = -1;
        this.retrieveTutorials();
    }
    retrieveTutorials(): void {
        this.tutorialService.getAll().snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                    ({ id: c.payload.doc.id, ...c.payload.doc.data() })
                )
            )
        ).subscribe(data => {
            this.tutorials = data;
        });
    }
    setActiveTutorial(tutorial: Tutorial, index: number): void {
        this.currentTutorial = tutorial;
        this.currentIndex = index;
    }
}
