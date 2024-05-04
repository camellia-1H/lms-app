import { values } from 'lodash';

export function withExtensions(baseList: any[] = [], extensions: any[] = []) {
  return [...baseList, ...extensions];
}

export const LIST_OF_COLOURS = [
  '#0290D7',
  '#4D4D4D',
  '#999999',
  '#F44E3B',
  '#FE9200',
  '#FCDC00',
  '#DBDF00',
  '#A4DD00',
  '#68CCCA',
  '#73D8FF',
  '#AEA1FF',
  '#FDA1FF',
  '#333333',
  '#808080',
  '#cccccc',
  '#D33115',
  '#E27300',
  '#FCC400',
  '#B0BC00',
  '#68BC00',
  '#16A5A5',
  '#009CE0',
  '#7B64FF',
  '#FA28FF',
  '#000000',
  '#666666',
  '#B3B3B3',
  '#9F0500',
  '#C45100',
  '#FB9E00',
  '#808900',
  '#194D33',
  '#0C797D',
  '#0062B1',
  '#653294',
  '#AB149E',
];

export const toolbarModules = {
  headers: [{ header: '1' }, { header: '2' }],
  listsAndIndents: [
    { list: 'ordered' },
    { list: 'bullet' },
    { indent: '-1' },
    { indent: '+1' },
  ],
  characterFormats: ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  colors: [
    { color: [...LIST_OF_COLOURS] },
    { background: [...LIST_OF_COLOURS] },
  ],
  clean: ['clean'],
  image: ['image', 'link'],
  align: [{ align: '' }, { align: 'center' }, { align: 'right' }],
};

const clipboardModule = {
  matchVisual: false,
};

const historyModule = {
  delay: 2000,
  maxStack: 100,
  userOnly: true,
};

export const modules = {
  toolbar: [],
  clipboard: { ...clipboardModule },
  history: { ...historyModule },
};

export const formatsSettings = {
  headers: ['header'],
  listsAndIndents: ['list', 'bullet', 'indent'],
  characterFormats: [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'align',
  ],
  colors: ['color', 'background'],
  image: ['image', 'link'],
};

export const formats = values(formatsSettings);

export function getModules({
  withImage,
  withHeaders,
}: {
  withImage: any;
  withHeaders: any;
}) {
  const baseModules = [
    toolbarModules.characterFormats,
    toolbarModules.colors,
    toolbarModules.clean,
    toolbarModules.listsAndIndents,
    toolbarModules.align,
  ];
  const addedModules = [];

  if (withImage) {
    addedModules.push(toolbarModules.image);
  }
  if (withHeaders) {
    addedModules.push(toolbarModules.headers);
  }

  return withExtensions(baseModules as any, addedModules as any);
}

export function getFormats({
  withImage,
  withHeaders,
}: {
  withImage: any;
  withHeaders: any;
}) {
  const baseFormats = [
    ...formatsSettings.characterFormats,
    ...formatsSettings.colors,
    ...formatsSettings.listsAndIndents,
  ];

  let addedFormats: any[] = [];

  if (withImage) {
    addedFormats = [...addedFormats, ...formatsSettings.image];
  }
  if (withHeaders) {
    addedFormats = [...addedFormats, ...formatsSettings.headers];
  }

  return withExtensions(baseFormats, addedFormats);
}
