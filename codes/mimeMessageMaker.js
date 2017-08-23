var mimemessage = require('mimemessage');

exports.mimeMessageMaker = function(XMLIPC2501, XMLIPC2541) {
    var msg,plain1Entity, plain2Entity;

    msg = mimemessage.factory({
        contentType: 'multipart/mixed',
        body: []
    });
    msg.header('Message-ID', '<IPC2501-2541>');

    plain1Entity = mimemessage.factory({
        contentType: 'text/xml;charset=utf-8',
        contentTransferEncoding : 'base64',
        body: XMLIPC2501
    });

    plain2Entity = mimemessage.factory({
        contentType: 'text/xml; charset=utf-8',
        contentTransferEncoding : 'base64',
        body: XMLIPC2541
    });

    msg.body.push(plain1Entity);
    msg.body.push(plain2Entity);
    var mime = msg.toString();
    return mime;
};
