const map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.XYZ({url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'}),
      }),
    ],
    target: 'map',
    view: new ol.View({
      center: ol.proj.fromLonLat([56.2318159330396,	58.00943264894912]),
      zoom: 10,
    }),
  });
  /*Добавление венкторных слоев*/
  //Сначала зададим стиль первого слоя
const MkdStyle = new ol.style.Style({
    fill: new ol.style.Fill({color: 'pink'
    }),
    stroke: new ol.style.Stroke ({
    color: 'black',
    with: 2,
})});
//Добавление первого слоя "Почвы"
const MkdLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'МКД_Пермь.geojson',
      format: new ol.format.GeoJSON(),
    }),
    style: MkdStyle, //Применяется перемення стиля
  });
//Стиль второго слоя "Поля"
const DistrictStyle = new ol.style.Style({
    stroke: new ol.style.Stroke ({
    color: 'blue',
    with: 5,
})});
//Добавление второго слоя "Поля"
const DistrictLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'Границы районов Перми.geojson',
      format: new ol.format.GeoJSON(),
    }),
    style: DistrictStyle, 
  });
map.addLayer(MkdLayer);
map.addLayer(DistrictLayer);
//Функция переключения видимиости слоев
function toggleLayer(layer, isvisible) {layer.setVisible(isvisible)}
//Обработчики на чекбоксов
document.getElementById('MkdLayer').addEventListener('change',function(){toggleLayer(MkdLayer, this.checked);});
document.getElementById('DistrictLayer').addEventListener('change',function(){toggleLayer(DistrictLayer, this.checked);});
 // Обработка кликов для отображения атрибутов
 map.on('singleclick', function (evt) {
    let contentHtml = '<ul>';
    map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        const properties = feature.getProperties();
        for (const key in properties) {
            if (key !== 'geometry') {
                contentHtml += `<li><strong>${key}:</strong> ${properties[key]}</li>`;
            }
        }
    });
    contentHtml += '</ul>';
    const attributesPanel = document.getElementById('attributesContent');
    attributesPanel.innerHTML = contentHtml || '<p>Нет данных для отображения</p>';
  });
  
  // Вызов функции показа атрибутов