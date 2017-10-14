import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';
// import { AngularFirestore,  } from 'angularfire2/firestore';
 
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  courses$: Observable<any[]>;
  course$;
  author$;
  // itemsRef: AngularFireList<any>;  
  // items: Observable<any[]>;
  coursesRef: AngularFireList<any>;  
  subscription: Subscription;
  constructor(private db: AngularFireDatabase) {
    this.coursesRef = db.list('courses');
    this.courses$ = this.coursesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })

    // console.log(this.courses$);
    // console.log(;this.courses$);
    // this.courses$ = db.list('/courses').snapshotChanges()
    // .map(courses => {
    //   console.log(courses);
    //   // let keyName = courses.key;
    //   // return { [keyName]: courses.payload};

      

    //   return courses;
    // });
    // console.log(this.courses$.map);

    this.course$ = db.object('/courses/-KwPsMbKybmxOriEK7nI').snapshotChanges().map(changes => {
      return { key: changes.payload.key, ...changes.payload.val() };
    })

    console.log(this.course$);

    // this.author$ = db.object('/authors/1').valueChanges();

  }

  ngOnDestroy() {
    // "auth != null"
    // this.subscription.unsubscribe();
  }

  add(course: HTMLInputElement) {
    this.coursesRef.push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        {title: 'Components'},
        {title: 'Directives'},
        {title: 'Templates'}
      ]
    });
    // let courseListObservable = this.coursesRef.snapshotChanges();
    // courseListObservable.subscribe();
    course.value = '';
  }

  update(course) {
    console.log(course);
    this.coursesRef.update(course.key, { name: "UPDATED!"});
  }

  delete(key) {    
    console.log(key);
    this.coursesRef.remove(key); 
  }

  deleteAll() {
    this.coursesRef.remove();
  }
}
