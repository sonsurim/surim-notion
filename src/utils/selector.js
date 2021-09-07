function $($element) {
	if (!$element) {
		return;
	}

	return document.querySelector($element);
}

function addClass($element, ...classNames) {
	if (!$element) {
		return;
	}

	classNames.forEach(className => $element?.classList.add(className));
}

function addClassAll($NodeList, className) {
	$NodeList.forEach($element => {
		$element?.classList.add(className);
	});
}

function removeClass($element, ...classNames) {
	if (!$element) {
		return;
	}

	classNames.forEach(className => $element?.classList.remove(className));
}

function removeClassAll($NodeList, className) {
	$NodeList.forEach($element => {
		$element?.classList.remove(className);
	});
}

function replaceClass($element, currentClassName, replaceClassName) {
	if (!$element) {
		return;
	}

	$element.classList.replace(currentClassName, replaceClassName);
}
