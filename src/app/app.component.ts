import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { TaskList } from '../pages/taskList/taskList';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage = TaskList;
	pages: Array<{title: string, component: any}>;

	constructor(
		public platform: Platform,
		public menu: MenuController,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen
	) {
		this.initializeApp();

		this.pages = [
			{ title: 'TaskList', component: TaskList },
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {

			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {

		this.menu.close();

		this.nav.setRoot(page.component);
	}
}
