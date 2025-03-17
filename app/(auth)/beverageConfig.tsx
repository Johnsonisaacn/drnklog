//provides for drink configurations used by all forms
type FieldConfig = {
  label: string;
  key: string;
  placeholder: string;
  type: 'text' | 'number';
};

type BeverageConfig = {
  [key: string]: FieldConfig[];
};

export const beverageConfig: BeverageConfig = {
  beer: [
    { label: 'Maker', key: 'maker', placeholder: 'brewery', type: 'text' },
    { label: 'Name', key: 'name', placeholder: 'beer name', type: 'text' },
    { label: 'Origin', key: 'origin', placeholder: 'origin', type: 'text' },
    { label: 'Style', key: 'style', placeholder: 'beer style', type: 'text' },
    { label: 'Malts', key: 'malts', placeholder: 'malts', type: 'text' },
    { label: 'Hops', key: 'hops', placeholder: 'hops', type: 'text' },
    { label: 'Yeast', key: 'yeast', placeholder: 'yeast', type: 'text' },
    { label: 'ABV', key: 'abv', placeholder: '% alcohol', type: 'text' },
    { label: 'Tasting Notes', key: 'tastingNotes', placeholder: 'tasting notes', type: 'text' },
    { label: 'Rating', key: 'rating', placeholder: 'rating 0-100', type: 'number' },
    { label: 'Additional Notes', key: 'moreNotes', placeholder: 'additional notes', type: 'text' },
  ],
  wine: [
    { label: 'Maker', key: 'maker', placeholder: 'winery', type: 'text' },
    { label: 'Name', key: 'name', placeholder: 'wine name', type: 'text' },
    { label: 'Style', key: 'style', placeholder: 'style', type: 'text' },
    { label: 'Grapes', key: 'grapes', placeholder: 'grape varietials', type: 'text' },
    { label: 'Country', key: 'country', placeholder: 'country of origin', type: 'text' },
    { label: 'Region', key: 'region', placeholder: 'region', type: 'text' },
    { label: 'Vintage', key: 'vintage', placeholder: 'vintage year', type: 'number' },
    { label: 'Tasting Notes', key: 'tastingNotes', placeholder: 'tasting notes', type: 'text' },
    { label: 'Rating', key: 'rating', placeholder: 'rating 0-100', type: 'number' },
    { label: 'Additional Notes', key: 'moreNotes', placeholder: 'additional notes', type: 'text' },
  ],
  coffee: [
    { label: 'Maker', key: 'maker', placeholder: 'roaster', type: 'text' },
    { label: 'Name', key: 'name', placeholder: 'coffee name', type: 'text' },
    { label: 'Country', key: 'country', placeholder: 'country of origin', type: 'text' },
    { label: 'Region', key: 'region', placeholder: 'region', type: 'text' },
    { label: 'Finca', key: 'finca', placeholder: 'finca', type: 'text' },
    { label: 'Roast Level', key: 'roastLevel', placeholder: 'roast level', type: 'text' },
    { label: 'Process', key: 'process', placeholder: 'process', type: 'text' },
    { label: 'Tasting Notes', key: 'tastingNotes', placeholder: 'tasting notes', type: 'text' },
    { label: 'Brewing Methods', key: 'brewingMethods', placeholder: 'brewing methods', type: 'text' },
    { label: 'Rating', key: 'rating', placeholder: 'rating 0-100', type: 'number' },
    { label: 'Additional Notes', key: 'moreNotes', placeholder: 'additional notes', type: 'text' },
  ],
};
