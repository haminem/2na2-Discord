/* eslint-disable require-jsdoc */
import { boundMethod } from 'autobind-decorator';
import { queryMessage } from '@/types.js';
import { Message } from 'discord.js';
import { GoogleSpreadsheet as GS } from 'google-spreadsheet';
/**
 * menu module
 */
export class SpreadSheet {
	public readonly name = 'SpreadSheet';

	@boundMethod
	public install() {
		return {
			mentionHook: this.mentionHook,
		};
	}

	@boundMethod
	private async mentionHook(message: Readonly<Message<boolean>>, query: queryMessage): Promise<boolean> {
		if (query.queryContent.includes('貸し登録')) {
			const setQuery = (() => {
				const num = message.content.indexOf("貸し登録 ");
				const setQuery = message.content.substring(num + 5).split(" ");
				const brrower = setQuery[0]!;
				const place = setQuery[1]!;
				return {
					brrower: brrower,
					place: place,
				};
			})();

			const SPREADSHEET_ID = '1KwI2KK7KB-ofjntgwTPrC4ooXxgEZRAXw5EwOVGHeyw';
			const CLIENT_ID = 'spreadsheet@spreadsheetdiscord.iam.gserviceaccount.com';
			const API_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDGjiBvzjmAEhiy\nPQ3bIsyQ3Q+KxYicBw/qkblUqsU9Fu5JDVHirQLNprqxMXqA3bXRa0TcBcopJ+1K\nVPv5LzHiSZRebL1zlPIb3J4nOHdyDIgKAwz/u7jIUtYsjO/AXmGOybUYkPWaLuSF\n7O20CuyqEEluHkJyyaw2SUsn0+GgLjr2DGJI2EmsMjMb/NA5UQNawDICIo4PZyvj\n//PhSpkb8iNYBbaQAohDLZed4+WnWcDT/ilvUczUpXORyu0WQTuBj7vGgOOjDgcO\npQqkCBrMlf0BgEhc97wKsHmA6zFiLGJCuuAi/dPKsCS1Gryw698wIIZDyNtpJDeI\nw87OCOplAgMBAAECggEAFW6vBVKN4LX+Bh39WmZMYuYHG57MlbGqH/2rMylHJsZ3\nDIShuPry6VmcylasbK+XRNaJisnHM3UUsegwK2AoSCRSyHSAE14EWknl+mwnxzRK\nFPE/scpvcj7a0S6aDI+Y2UMK8hlnoW/RXrwfQRwdcBKs/R7KuRLtgg3xol1xJosr\nmNhPYH4B3HynZGNF1H/AGtUiVN139R05nkLuVLUN/SKnKlpP+tZVAUqvja1F3Zfl\ngdfFi2bNbtf/RlOMnzDPZBtICPwUO+fB8an76CGEaZvkOtuk2srXUMDoKDjc3Ked\n3VMUx/QhGKrgkWQmbz1zzPG0l8f/hBYIsNlTc6sY6wKBgQDomMkRB4VepfGq1IQE\nGGhwLYyXxu/rUXHJYoywCoW8Y364pib8o+cFQLhlqlNOSCRc+XqIfEX0E8opyRnQ\nk5yzJ9ToKAmyhffoGtmxUvMfvO+qIe9+X2WCUbaHB9jpx6UaO5wrjEpz+K05PTpo\ng5Zgh+/HZhCXkzE6Y9zvm0ti4wKBgQDaiH+5qiu4PaSv4SHalPRZsFzFv1JIUsNX\nJi6sXnjdxnA7wLIi+gjbRIYvWdH/5MyWAGGAX7lyUWHIXrWmGC+i6NQ7RRnoyt4Y\nYxTCfjYOEsfxMuk/uwIiC9CRxJOz/G+VY0lnSKcFM2yonoqTWOPsWkV5U0XyyJsm\niRBIwLdYFwKBgQDUqkVEpbzCojVI/U/LMsnirzLZ3xGj9W51M/7wQl6utcW6bGg/\nHFjwy5ENm2LZs0pUG+J2AjIvjRyNggpxU1W11Jhsv5bGPIlDFbGu2OnkPepfgvGn\neO+l7LJX2cvxTBHf31rV0kqMqHUxXZMW1iFbF08b4G0ROYqMGZx7E2ElAwKBgQCk\nfoi+BbTBC02SwkEMWoEPnexHQXs7S2kUiX4qazZJoZxLrgGoyFKwUgU7UT38g4no\nA0NhMSzTOyUCgR/0dVIuK1nNf3dAPqws6S/wMraXo1VzXmIqgabaX9BQWQrhOUv4\nw/K11v85r/rDdgtTXF68Qzr2V1NYq931hMiIKuAXYwKBgQDIsq8s9E2yO9RxHSQa\ntXlXnvvIulLo8z3a9W+gasZZbGvam++cfmpkkJmxzj6VriQOzAriufXvswDCcIRx\nBUTouZs2xIc3pS4ki+kW7SW+HY8rWJrG95bl5uHasJQeMljjp66YVQzU3DaXeMZ7\niOPjrAp5IIJ8U0d7oTK9FHv+/w==\n-----END PRIVATE KEY-----\n';
			const WORKSHEET_ID = '0';

			const doc = new GS(SPREADSHEET_ID);
			await doc.useServiceAccountAuth({
				client_email: CLIENT_ID,
				private_key: API_KEY,
			});
			await doc.loadInfo();
			const sheet = doc.sheetsById[WORKSHEET_ID];
			await sheet?.addRow({
				'相手': setQuery.brrower,
				'金額': setQuery.place,
			});
			const rows = await sheet?.getRows();
			const row = rows?.[Math.floor(Math.random() * rows.length)];
			console.log(row?.['_rawData']);
			message.reply(`${row?.['_rawData'][0]}に${row?.['_rawData'][1]}円`);
			return true;
		} else if (query.queryContent.includes('貸し検索')) {
			// const setQuery = (() => {
			// 	const setQuery = message.content.replace('貸し検索 ', '').split(' ');
			// 	const brrower = setQuery[0]!;
			// 	return {
			// 		brrower: brrower,
			// 	};
			// })();

			// const SPREADSHEET_ID = '1KwI2KK7KB-ofjntgwTPrC4ooXxgEZRAXw5EwOVGHeyw';
			// const CLIENT_ID = 'spreadsheet@spreadsheetdiscord.iam.gserviceaccount.com';
			// const API_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDGjiBvzjmAEhiy\nPQ3bIsyQ3Q+KxYicBw/qkblUqsU9Fu5JDVHirQLNprqxMXqA3bXRa0TcBcopJ+1K\nVPv5LzHiSZRebL1zlPIb3J4nOHdyDIgKAwz/u7jIUtYsjO/AXmGOybUYkPWaLuSF\n7O20CuyqEEluHkJyyaw2SUsn0+GgLjr2DGJI2EmsMjMb/NA5UQNawDICIo4PZyvj\n//PhSpkb8iNYBbaQAohDLZed4+WnWcDT/ilvUczUpXORyu0WQTuBj7vGgOOjDgcO\npQqkCBrMlf0BgEhc97wKsHmA6zFiLGJCuuAi/dPKsCS1Gryw698wIIZDyNtpJDeI\nw87OCOplAgMBAAECggEAFW6vBVKN4LX+Bh39WmZMYuYHG57MlbGqH/2rMylHJsZ3\nDIShuPry6VmcylasbK+XRNaJisnHM3UUsegwK2AoSCRSyHSAE14EWknl+mwnxzRK\nFPE/scpvcj7a0S6aDI+Y2UMK8hlnoW/RXrwfQRwdcBKs/R7KuRLtgg3xol1xJosr\nmNhPYH4B3HynZGNF1H/AGtUiVN139R05nkLuVLUN/SKnKlpP+tZVAUqvja1F3Zfl\ngdfFi2bNbtf/RlOMnzDPZBtICPwUO+fB8an76CGEaZvkOtuk2srXUMDoKDjc3Ked\n3VMUx/QhGKrgkWQmbz1zzPG0l8f/hBYIsNlTc6sY6wKBgQDomMkRB4VepfGq1IQE\nGGhwLYyXxu/rUXHJYoywCoW8Y364pib8o+cFQLhlqlNOSCRc+XqIfEX0E8opyRnQ\nk5yzJ9ToKAmyhffoGtmxUvMfvO+qIe9+X2WCUbaHB9jpx6UaO5wrjEpz+K05PTpo\ng5Zgh+/HZhCXkzE6Y9zvm0ti4wKBgQDaiH+5qiu4PaSv4SHalPRZsFzFv1JIUsNX\nJi6sXnjdxnA7wLIi+gjbRIYvWdH/5MyWAGGAX7lyUWHIXrWmGC+i6NQ7RRnoyt4Y\nYxTCfjYOEsfxMuk/uwIiC9CRxJOz/G+VY0lnSKcFM2yonoqTWOPsWkV5U0XyyJsm\niRBIwLdYFwKBgQDUqkVEpbzCojVI/U/LMsnirzLZ3xGj9W51M/7wQl6utcW6bGg/\nHFjwy5ENm2LZs0pUG+J2AjIvjRyNggpxU1W11Jhsv5bGPIlDFbGu2OnkPepfgvGn\neO+l7LJX2cvxTBHf31rV0kqMqHUxXZMW1iFbF08b4G0ROYqMGZx7E2ElAwKBgQCk\nfoi+BbTBC02SwkEMWoEPnexHQXs7S2kUiX4qazZJoZxLrgGoyFKwUgU7UT38g4no\nA0NhMSzTOyUCgR/0dVIuK1nNf3dAPqws6S/wMraXo1VzXmIqgabaX9BQWQrhOUv4\nw/K11v85r/rDdgtTXF68Qzr2V1NYq931hMiIKuAXYwKBgQDIsq8s9E2yO9RxHSQa\ntXlXnvvIulLo8z3a9W+gasZZbGvam++cfmpkkJmxzj6VriQOzAriufXvswDCcIRx\nBUTouZs2xIc3pS4ki+kW7SW+HY8rWJrG95bl5uHasJQeMljjp66YVQzU3DaXeMZ7\niOPjrAp5IIJ8U0d7oTK9FHv+/w==\n-----END PRIVATE KEY-----\n';
			// const WORKSHEET_ID = '0';

			// const doc = new GS(SPREADSHEET_ID);
			// await doc.useServiceAccountAuth({
			// 	client_email: CLIENT_ID,
			// 	private_key: API_KEY,
			// });
			// await doc.loadInfo();
			// const sheet = doc.sheetsById[WORKSHEET_ID];
			// const rows = await sheet?.getRows();
			// const row = rows?.[Math.floor(Math.random() * rows.length)];
			// console.log(row?.['_rawData']);
			// message.reply(`${row?.['_rawData'][0]}に${row?.['_rawData'][1]}円`);
			return true;
		} else {
			return false;
		}
	}
}
