$(document).ready(function () {

    init();

    $(document).mousedown(function (e) {
        if (e.which == 2) {
            camera.position.set(5, 2, 2);
            camera.lookAt(scene.position);
            render();
        }
    });

});

function init() {
    //camera
    renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#canvas")});
    gl = renderer.context;
    camera = new THREE.PerspectiveCamera(50, 1, 1, 200);
    camera.position.set(10, 4, 4);

    //scene
    scene = new THREE.Scene();
    camera.lookAt(scene.position);

    //controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.enableZoom = true;
    controls.mouseButtons.ORBIT = THREE.MOUSE.RIGHT;
    scene.add(controls);

    //axis
    var axis = new THREE.AxisHelper(3);
    scene.add(axis);


    mesh = getDropMesh();

    var light = new THREE.PointLight( 0xff0000, 2, 100 );

    light.position.set( 0, 5, 5 );

    scene.add( light );

    mesh.position.set(1, 1, 1);

    scene.add(mesh);

    render();

}

function render() {
    renderer.render(scene, camera);
}

function getDropMesh() {
    var a = 0.5;
    var b = 2;

    var paramFunction = function (u, v, optionalTarget) {

        var result = optionalTarget || new THREE.Vector3();

        u *= Math.PI;
        v *= 2 * Math.PI;

        var x = a * (b - Math.cos(u)) * Math.sin(u) * Math.cos(v);
        var y = a * (b - Math.cos(u)) * Math.sin(u) * Math.sin(v);
        var z = Math.cos(u);

        return result.set(x, y, z);
    };

    var geometry = new THREE.ParametricGeometry(paramFunction, 30, 30);

    geometry.computeFaceNormals();

    var materialTest = new THREE.MeshLambertMaterial({color:0x4977dd});

    var mesh = new THREE.Mesh(geometry, materialTest);



    return mesh;
}
