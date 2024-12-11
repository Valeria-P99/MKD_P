function displayAttributesInPanel(evt, map) {
    const attributesContent = document.getElementById('attributes-content');
    attributesContent.innerHTML = 'contentHtml'; // Очищаем содержимое перед добавлением
  
    // Перебираем фичи под курсором
    map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
      const properties = feature.getProperties();
      let contentHtml = '<ul>';
  
      for (const key in properties) {
        if (properties.hasOwnProperty(key) && key !== 'geometry') {
          const displayName = attributeNames[key] || key;
          contentHtml += `<li><strong>${displayName}:</strong> ${properties[key]}</li>`;
        }
      }
  
      contentHtml += '</ul>';
      attributesContent.innerHTML += contentHtml; // Добавляем содержимое
    });
  }
  
  // Подключение обработчика события
  function setupAttributesPanel(map) {
    map.on('singleclick', function (evt) {
      displayAttributesInPanel(evt, map);
    });
  }  
  setupAttributesPanel(map);