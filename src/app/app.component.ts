import { Component  } from '@angular/core';
import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private electron: ElectronService) {
    document.body.classList.add('cm-s-monokai');
    document.body.classList.add('CodeMirror');
  }

}
