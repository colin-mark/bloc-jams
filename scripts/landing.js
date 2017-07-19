var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(element) {
    element.style.opacity = 1;
    element.style.transform = "scaleX(1) translateY(0)";
    element.style.msTransform = "scaleX(1) translateY(0)";
    element.style.WebkitTransform = "scaleX(1) translateY(0)";
}

var animatePoints = function(pointsArray) {
    forEach(pointsArray, revealPoint);
 };

window.onload = function() {
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }

    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener('scroll', function(event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints (pointsArray);
        }
    });
}
