import React from 'react'

function Footer() {
  return (
    <footer className="info">
    <p>Click to edit a todo</p>
    <p>Created by <a href="https://www.linkedin.com/in/halilkrkn/">Halilkrkn</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
  )
}

// Buradaki React.memo yeniden oluşturulan yani render edilen bir componentte tekrar tekrar render edilmemesi için 
// React.memo kullaranak önbelleğe alıp artık ilgili component tekrar çağırılsa bile Footer render edilmeyecek
// Çünkü Footer dinamik yapıda bir component değil içerisinde değişiklik veya başka bir durum içermediği için.
// Bu şekilde memorization işlemi yapılmış olur ve memory'de çok işlem yapılmamış olur.
export default React.memo(Footer)