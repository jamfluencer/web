export const userMap: Record<string, string> = {
  '1236711152': 'James',
  'matt.witkowicz': 'Matt',
  hzcvr820nvkv5mwamvptxhns4: 'Nate',
  i88pa9ajt0fhh089bz7vhwd48: 'Nick',
  prince_of_space: 'Ryan',
  toothlessrebel: 'Marshall',
} as const;

export const getUser = (id: string): string => userMap[id] ?? id;
