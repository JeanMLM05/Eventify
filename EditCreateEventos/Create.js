document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('createEventForm');
  
    form.addEventListener('submit', function (event) {
      let isValid = true;
  
      // Helper function to show error message
      function showError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(errorId);
        if (input.value.trim() === '') {
          errorElement.textContent = message;
          errorElement.style.display = 'block';
          isValid = false;
        } else {
          errorElement.style.display = 'none';
        }
      }
  
      // Validate each field
      showError('eventTitle', 'titleError', 'El título es obligatorio.');
      showError('eventDate', 'dateError', 'La fecha es obligatoria.');
      showError('eventLocation', 'locationError', 'El lugar es obligatorio.');
      showError('eventTime', 'timeError', 'La hora es obligatoria.');
      showError('eventDescription', 'descriptionError', 'La descripción es obligatoria.');
      showError('eventRules', 'rulesError', 'Las reglas son obligatorias.');
  
      // Prevent form submission if not valid
      if (!isValid) {
        event.preventDefault();
      }
    });
  });
  