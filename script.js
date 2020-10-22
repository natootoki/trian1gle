function draw() {
  var zoom = 10**(0.04*(document.getElementById("zoom").value-50));
  var line1 = document.getElementById("line1").value*zoom;
  var line2 = document.getElementById("line2").value*zoom;
  var line3 = document.getElementById("line3").value*zoom;
  var line1c = document.getElementById("line1c").checked;
  var line2c = document.getElementById("line2c").checked;
  var line3c = document.getElementById("line3c").checked;
  var theta1c = document.getElementById("theta1c").checked;
  var theta2c = document.getElementById("theta2c").checked;
  var theta3c = document.getElementById("theta3c").checked;
  var rot = (document.getElementById("rot").value*3.6-180)*Math.PI/180;
  var beginx = document.getElementById("xslide").value*3, beginy = document.getElementById("yslide").value*3;
  var theta2 = Math.acos((line1/line3+line3/line1-line2*line2/line1/line3)/2);
  var theta3 = Math.acos((line2/line1+line1/line2-line3*line3/line2/line1)/2);
  var theta1 = Math.acos((line3/line2+line2/line3-line1*line1/line3/line2)/2);
  var x1 = beginx, y1 = beginy;
  var x2 = beginx+line1*Math.cos(rot), y2 = beginy-line1*Math.sin(rot);
  var x3 = beginx+line3*Math.cos(theta2+rot), y3 = beginy-line3*Math.sin(theta2+rot);
  var xg = (x1+x2+x3)/3, yg = (y1+y2+y3)/3;
  var canvas = document.getElementById('canvas');
  canvas.style.border = "4px solid";
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var l1 = ctx.measureText( line1.toFixed() ) ;
    var l2 = ctx.measureText( line2.toFixed() ) ;
    var l3 = ctx.measureText( line3.toFixed() ) ;
    var t2 = ctx.measureText( (theta2*180/Math.PI).toFixed()+'°' ) ;
    var t3 = ctx.measureText( (theta3*180/Math.PI).toFixed()+'°' ) ;
    var t1 = ctx.measureText( (theta1*180/Math.PI).toFixed()+'°' ) ;

    ctx.clearRect(0, 0, 300, 300);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();

    if (line1c) ctx.fillText((line1/zoom).toFixed(), (x1+x2)/2+((x1+x2)/2-xg)/Math.sqrt(((x1+x2)/2-xg)**2+((y1+y2)/2-yg)**2)*20-l1.width/2, (y1+y2)/2+((y1+y2)/2-yg)/Math.sqrt(((x1+x2)/2-xg)**2+((y1+y2)/2-yg)**2)*20-(l1.actualBoundingBoxAscent+l1.actualBoundingBoxDescent)/2);
    if (line2c) ctx.fillText((line2/zoom).toFixed(), (x2+x3)/2+((x2+x3)/2-xg)/Math.sqrt(((x2+x3)/2-xg)**2+((y2+y3)/2-yg)**2)*20-l2.width/2, (y2+y3)/2+((y2+y3)/2-yg)/Math.sqrt(((x2+x3)/2-xg)**2+((y2+y3)/2-yg)**2)*20-(l2.actualBoundingBoxAscent+l2.actualBoundingBoxDescent)/2);
    if (line3c) ctx.fillText((line3/zoom).toFixed(), (x3+x1)/2+((x3+x1)/2-xg)/Math.sqrt(((x3+x1)/2-xg)**2+((y3+y1)/2-yg)**2)*20-l3.width/2, (y3+y1)/2+((y3+y1)/2-yg)/Math.sqrt(((x3+x1)/2-xg)**2+((y3+y1)/2-yg)**2)*20-(l3.actualBoundingBoxAscent+l3.actualBoundingBoxDescent)/2);
    if (theta2c) ctx.fillText((theta2*180/Math.PI).toFixed()+'°', x1+(x1-xg)/Math.sqrt((x1-xg)**2+(y1-yg)**2)*10-t2.width/2, y1+(y1-yg)/Math.sqrt((x1-xg)**2+(y1-yg)**2)*10+(t2.actualBoundingBoxAscent+t2.actualBoundingBoxDescent)/2);
    if (theta3c) ctx.fillText((theta3*180/Math.PI).toFixed()+'°', x2+(x2-xg)/Math.sqrt((x2-xg)**2+(y2-yg)**2)*10-t3.width/2, y2+(y2-yg)/Math.sqrt((x2-xg)**2+(y2-yg)**2)*10+(t3.actualBoundingBoxAscent+t3.actualBoundingBoxDescent)/2);
    if (theta1c) ctx.fillText((theta1*180/Math.PI).toFixed()+'°', x3+(x3-xg)/Math.sqrt((x3-xg)**2+(y3-yg)**2)*10-t1.width/2, y3+(y3-yg)/Math.sqrt((x3-xg)**2+(y3-yg)**2)*10+(t1.actualBoundingBoxAscent+t1.actualBoundingBoxDescent)/2);
  }
}
