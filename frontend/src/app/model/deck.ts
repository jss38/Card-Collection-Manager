import { Brand } from 'src/app/model/brand';

export interface Deck 
{
	_id?: string,
	isPublic: boolean,
	name: string,
	edition: string,
	image: string, // temporary
	brand: Brand,

	// optional
	date_of_issue?: Date,
	stock?: string,
	finish?: string,
	print_run?: number,
	retail_price?: number,
	manufacturer?: string,
	product_description?: string;
}
