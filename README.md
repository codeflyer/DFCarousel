DFCarousel
=======

#install

```
npm install
bower update
grunt dist
```

Note:
(MacOsX)
If the installation of your node.js is made as a root user the npm install can fail.
The problem is given by the first installation of phantom.js. Retry install with
```
sudo npm install
```

##run test
```
grunt test
```

#Quick start
```html
<script type="text/javascript">
    angular.module('sample-app', ['df.carousel'])
            .controller('sampleCtrl', function($scope) {
                $scope.imageList = [
                    'img/a.jpg',
                    'img/b.jpg',
                    'img/c.jpg',
                    'img/d.jpg',
                    'img/e.jpg',
                    'img/f.jpg'
                ];
            }
    );
</script>

<div df-carousel item-list="imageList" class="my-class"></div>
or 
<df-carousel item-list="imageList" class="my-class"></df-carousel>
```

##Customize

To change the dimension:

```
.df-carousel.my-class {
    width: 800px;
    height: 600px;
}
```

To change the transaction type of the carousel:
```
.df-carousel.my-class .df-carousel-transition {
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -ms-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
}
```

The buttons are referred by the class

```
.df-carousel .carousel-button

.df-carousel .carousel-button.left // the left button
.df-carousel .carousel-button.right // the right button
```
