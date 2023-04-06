ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [52.734750, 41.452274],
            zoom: 15,
            controls: [],
        }, {
            searchControlProvider: 'yandex#search'
        }),


        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'images/vector/pin-map.svg',
            // Размеры метки.
            iconImageSize: [56, 68],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        });

    myMap.geoObjects
        .add(myPlacemark)
});
