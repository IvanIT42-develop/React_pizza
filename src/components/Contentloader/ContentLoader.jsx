import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={320} // Теперь совпадает с реальной карточкой
    height={500}
    viewBox="0 0 320 500" // Координатная сетка расширена до 320
    style={{ width: '100%', maxWidth: '320px' }} 
    backgroundColor="#e3e3e3"
    foregroundColor="#c4c4c4"
    {...props}
    className="loader"
  >
    {/* Центрируем круг: (320 / 2) = 160. Ставим cx="160" */}
    <circle cx="160" cy="136" r="125" /> 
    
    {/* Заголовок на всю ширину 320 */}
    <rect x="0" y="279" rx="10" ry="10" width="320" height="23" /> 
    
    {/* Блок выбора теста/размера на всю ширину 320 */}
    <rect x="0" y="337" rx="10" ry="10" width="320" height="88" /> 
    
    {/* Цена (слева) */}
    <rect x="0" y="445" rx="10" ry="10" width="95" height="30" /> 
    
    {/* Кнопка "Добавить" (справа, прижата к краю 320) */}
    <rect x="168" y="437.5" rx="24" ry="24" width="152" height="45" />
  </ContentLoader>
)

export default MyLoader
