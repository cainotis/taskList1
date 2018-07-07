import { Component } from '@angular/core';

import { NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

import { AlertController } from 'ionic-angular';


import db from 'diskdb';

@Component({
	selector: 'page-taskList',
	templateUrl: 'taskList.html'
})

export class TaskList {
	items: Array<{title: string, details : string}>;

	constructor(public navCtrl: NavController,
	            public navParams: NavParams,
	            public platform: Platform,
	            public actionsheetCtrl: ActionSheetController,
	            private alertCtrl: AlertController	
	            ) { 

		this.items = [];

		localStorage.getItem('taskList')

		this.items = JSON.parse(localStorage.getItem('taskList'))

		if (this.items.length == 0){
			this.items.push({
				title : 'Adicionar novo item',
				details : ''
			});
		}
		else{}
	}
	
	itemTapped(event, item) {
		if (item.title == 'Adicionar novo item'){
			this.doPrompt();
			let data = JSON.stringify(this.items)
			localStorage.setItem('taskList',data)
		}
		else {
			let actionSheet = this.actionsheetCtrl.create({
				cssClass: 'action-sheets-test-page',
				buttons : [
					{
						text : 'Ver',
						handler : () =>{
							console.log('Ver clicked');
							this.navCtrl.push(ItemDetailsPage, {
								item: item
							});
						}
					},
					{
						text: 'Deletar',
						role: 'destructive',
						icon: !this.platform.is('ios') ? 'trash' : null,
						handler: () => {
							console.log('Deletar clicked' + item.title);
							this.items.splice(this.items.indexOf(item),1);
							let data = JSON.stringify(this.items)
							localStorage.setItem('taskList',data)
						}
					},
					{
						text: 'Cancel',
						role: 'cancel',
						icon: !this.platform.is('ios') ? 'close' : null,
						handler: () => {
							console.log('Cancel cliked');
						}
					}
				]
			});
			actionSheet.present();
		}
	}
	doPrompt() {
		let data : any
		let alert = this.alertCtrl.create({
			title: 'Nova Tarefa',
			inputs: [
				{
					name: 'title',
					placeholder: 'Nome',
				},
				{
					name : 'details',
					placeholder : 'Detalhes',
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					handler: () => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Salvar',
					handler: (data) => {
						console.log('Saved clicked ');
						this.items.push(data);
					}
				}
			]
		});
		alert.present();
	}
}
