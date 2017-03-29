import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { LoadRunnerService } from '../services/loadrunner.service';

@Component({
	selector: 'load-runner',
	templateUrl: 'load-runner.component.html',
	styles: [require('./load-runner.component.scss')],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadRunnerComponent {

	constructor(private loadRunnerService: LoadRunnerService) {
	}
}
