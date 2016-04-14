import knox from 'knox';
import Q from 'q';

export const saveGPXToS3 = (xml, journeyId) => {
  const deferred = Q.defer();

  var client = knox.createClient({
    key: 'AKIAILBUW6XUPMXMZUHQ',
    secret: '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',
    bucket: 'octopus-gpx'
  });

  const buffer = new Buffer(xml);
  const headers = {
    'Content-Length': Buffer.byteLength(xml),
    'Content-Type': 'application/octet-stream',
    'x-amz-acl': 'public-read'
  };

  const url = `s3-eu-west-1.amazonaws.com/octopus-gpx/journeys/${journeyId}.gpx`;

  client.putBuffer(buffer, 'journeys/' + journeyId + '.gpx',  headers, (error, result) => {
    if (error) {
      deferred.reject(error);
    } else {
      deferred.resolve(url);
    }
  });

  return deferred.promise;
};
