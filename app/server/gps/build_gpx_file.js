import gpx from 'gpx';

export const buildGPXFile = (coordinates) => {
  const builder = new gpx.GpxFileBuilder();

  const xmlBuilder = builder.setFileInfo({
    name : 'Test file',
    description : 'A test file generated in javascript',
    creator : 'My Application',
    time : new Date(),
    keywords : ['gpx']
  });

  xmlBuilder.addRoute({
      name : 'Octopus route'
  }, coordinates);

  const xml = xmlBuilder.xml();
  return xml;
};
