import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  courses$;
  course$;
  author$;
  subscription: Subscription;
  // courses: FirebaseListObservable<any>;
  constructor(db: AngularFireDatabase) {
    // db.list('/courses').valueChanges().subscribe(courses => console.log(courses));
    // console.log( db.list);

    // db.list('course').push({name: 5, value: 'sadasdasd'});

    // auth != null

    // this.subscription = db.list('/courses').subscribe(courses => {
    //   this.courses = courses;
    //   console.log(courses);
    // })

    this.courses$ = db.list('/courses');
    this.course$ = db.object('/courses/1');
    this.author$ = db.object('/authors/1');
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
