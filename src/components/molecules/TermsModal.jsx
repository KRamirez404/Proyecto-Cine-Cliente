import PropTypes from 'prop-types';
import { Modal } from '@molecules';

/**
 * TermsModal Component
 * 
 * Modal con el texto completo de Términos y Condiciones
 */
const TermsModal = ({ isOpen, onClose, type = 'terms' }) => {
  const content = {
    terms: {
      title: 'Términos y Condiciones de Uso',
      sections: [
        {
          heading: '1. Aceptación de los Términos',
          text: 'Al acceder y utilizar este sitio web de CineApp, usted acepta cumplir con estos términos y condiciones de uso. Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestro sitio web o servicios.'
        },
        {
          heading: '2. Compra de Boletos',
          text: 'Al realizar una compra de boletos a través de nuestra plataforma, usted acepta que: (a) La información proporcionada es precisa y completa, (b) Los boletos son intransferibles y válidos únicamente para la función, fecha y hora especificadas, (c) No se permiten reembolsos excepto en casos de cancelación de función por parte del cine, (d) Los boletos deben presentarse en formato digital o impreso al momento de ingresar a la sala.'
        },
        {
          heading: '3. Precios y Pagos',
          text: 'Todos los precios están expresados en Pesos Colombianos (COP) e incluyen los impuestos aplicables. CineApp se reserva el derecho de modificar los precios en cualquier momento. Los métodos de pago aceptados incluyen tarjetas de crédito, débito y efectivo en taquilla. Las transacciones en línea se procesan a través de pasarelas de pago seguras.'
        },
        {
          heading: '4. Selección de Asientos',
          text: 'La selección de asientos está sujeta a disponibilidad. Una vez confirmada la compra, los asientos seleccionados quedan reservados. Si abandona el proceso de compra, los asientos se liberarán automáticamente después de 10 minutos.'
        },
        {
          heading: '5. Cancelaciones y Reembolsos',
          text: 'Las cancelaciones de boletos no están permitidas una vez confirmada la compra, excepto en los siguientes casos: (a) Cancelación de la función por parte del cine, (b) Fallo técnico comprobado durante la compra, (c) Error en la información de la función. Los reembolsos se procesarán en un plazo de 5 a 10 días hábiles.'
        },
        {
          heading: '6. Uso del Sitio Web',
          text: 'Usted se compromete a: (a) No utilizar el sitio con fines ilegales o no autorizados, (b) No intentar acceder a áreas restringidas del sistema, (c) No reproducir, duplicar o copiar contenido sin autorización, (d) No interferir con el funcionamiento del sitio mediante virus, malware o código malicioso.'
        },
        {
          heading: '7. Propiedad Intelectual',
          text: 'Todo el contenido del sitio, incluyendo textos, gráficos, logotipos, imágenes, clips de audio y software, es propiedad de CineApp o sus licenciantes y está protegido por las leyes de derechos de autor y propiedad intelectual de Colombia.'
        },
        {
          heading: '8. Limitación de Responsabilidad',
          text: 'CineApp no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de uso de nuestros servicios, incluyendo pérdida de datos, pérdida de beneficios o interrupción del negocio.'
        },
        {
          heading: '9. Modificaciones',
          text: 'CineApp se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. Su uso continuado del sitio después de dichas modificaciones constituirá su aceptación de los nuevos términos.'
        },
        {
          heading: '10. Ley Aplicable',
          text: 'Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República de Colombia. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Colombia.'
        }
      ]
    },
    privacy: {
      title: 'Política de Privacidad',
      sections: [
        {
          heading: '1. Recopilación de Información',
          text: 'CineApp recopila información personal que usted proporciona voluntariamente al crear una cuenta, comprar boletos o utilizar nuestros servicios. Esta información incluye: nombre completo, dirección de correo electrónico, número de teléfono, información de pago y preferencias de usuario.'
        },
        {
          heading: '2. Uso de la Información',
          text: 'Utilizamos su información personal para: (a) Procesar sus compras de boletos, (b) Enviar confirmaciones y notificaciones sobre sus reservas, (c) Mejorar nuestros servicios y experiencia de usuario, (d) Enviar comunicaciones promocionales (con su consentimiento), (e) Cumplir con obligaciones legales y regulatorias.'
        },
        {
          heading: '3. Protección de Datos',
          text: 'Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye encriptación SSL, firewalls y acceso restringido a los datos personales.'
        },
        {
          heading: '4. Compartir Información',
          text: 'No vendemos, intercambiamos ni transferimos su información personal a terceros, excepto: (a) Proveedores de servicios que nos ayudan a operar nuestro sitio web, (b) Autoridades legales cuando sea requerido por ley, (c) Con su consentimiento explícito para fines específicos.'
        },
        {
          heading: '5. Cookies y Tecnologías Similares',
          text: 'Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web, analizar tendencias, administrar el sitio y recopilar información demográfica. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.'
        },
        {
          heading: '6. Derechos del Usuario',
          text: 'Usted tiene derecho a: (a) Acceder a su información personal, (b) Solicitar corrección de datos inexactos, (c) Solicitar eliminación de sus datos, (d) Oponerse al procesamiento de sus datos, (e) Solicitar la portabilidad de sus datos, (f) Retirar su consentimiento en cualquier momento.'
        },
        {
          heading: '7. Retención de Datos',
          text: 'Conservamos su información personal durante el tiempo necesario para cumplir con los propósitos descritos en esta política, a menos que la ley requiera o permita un período de retención más prolongado. Los datos de transacciones se conservan durante 5 años por requisitos fiscales.'
        },
        {
          heading: '8. Menores de Edad',
          text: 'Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente información personal de menores. Si descubrimos que hemos recopilado información de un menor sin el consentimiento de los padres, eliminaremos dicha información de inmediato.'
        },
        {
          heading: '9. Enlaces a Terceros',
          text: 'Nuestro sitio web puede contener enlaces a sitios de terceros. No somos responsables por las prácticas de privacidad de estos sitios. Le recomendamos leer las políticas de privacidad de cada sitio web que visite.'
        },
        {
          heading: '10. Contacto',
          text: 'Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, puede contactarnos en: Email: privacidad@cineapp.com | Teléfono: +57 (1) 234-5678 | Dirección: Calle 123 #45-67, Bogotá, Colombia'
        }
      ]
    }
  };

  const selectedContent = content[type] || content.terms;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedContent.title}
      size="lg"
      showCloseButton={true}
    >
      <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {selectedContent.sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-neutral-900 mb-2">
                {section.heading}
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 text-center">
            Última actualización: Octubre 2025
          </p>
        </div>
      </div>

      <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          Entendido
        </button>
      </div>
    </Modal>
  );
};

TermsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['terms', 'privacy']),
};

export default TermsModal;
