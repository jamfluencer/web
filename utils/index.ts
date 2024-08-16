export const userMap: Record<string, string> = {
  '1236711152': 'James',
  'matt.witkowicz': 'Matt',
  '31yyjf7lal2fpxw7umyo4abj7boy': 'Matt',
  'hzcvr820nvkv5mwamvptxhns4': 'Nate',
  'i88pa9ajt0fhh089bz7vhwd48': 'Nick',
  'prince_of_space': 'Ryan',
  'toothlessrebel': 'Marshall',
  '31jx2bfbged6bjpaevna4xkxjhem': 'Scott',
  '12158652399': 'Stewan',
  'csdvx92jpnz6n418mx27syaox': 'Ricardo',
  'musicaljoeker': 'Joseph',
  '31u5udr3hglumfasdxkce66mvani': 'Kalyn',
  '21xxwycxix6fo62h6akfpz6oi': 'Wade',
  '124576498': 'Emily aka 124576498',
  '21qi2etjlsxe4wfferqgvjb4i': 'Luke',
  'hsingh051': 'Harpreet',
} as const;

export const getUser = (id: string): string => userMap[id] ?? id;

export const isAuthenticated = () => {
  const token = useCookie<string>('token');
  return typeof token.value === 'string' && token.value.length > 0;
};
