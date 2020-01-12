import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { ResultComponent } from './result/result.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('resultCmp', {static: true}) resultCmp: ResultComponent;
  worker: Worker;

  constructor(
    private electron: ElectronService,
    private changeDetector: ChangeDetectorRef) {
    this.electron = electron;
  }

  cleanResult() {
    this.resultCmp.clean();
  }

  addResult(line) {
    setTimeout(() => {
      // electron need this to refresh view
      this.changeDetector.detectChanges();
    }, 0);
    return this.resultCmp.addLine(line);
  }

  runCode(code) {
    this.terminate();

    this.worker = new Worker('./assets/app.worker.js');
    this.cleanResult();

    this.worker.onmessage = ({ data }) => {
      const res = JSON.parse(data);

      const error = !this.addResult(res.data);
      if (res.finish || error) {
        this.terminate();
      }
    };

    this.worker.onerror = error => {
      this.addResult(error.message);
    };

    this.worker.postMessage(code);
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
