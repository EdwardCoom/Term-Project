document.addEventListener('click', e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if(!isDropdownButton && e.target.closest("[data-dropdown]") != null) return

    let curDropdown
    if(isDropdownButton) {
        curDropdown = e.target.closest("[data-dropdown]")
        curDropdown.classList.toggle('active')
    }
    
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if(dropdown === curDropdown) return
        dropdown.classList.remove('active')
    })
} )