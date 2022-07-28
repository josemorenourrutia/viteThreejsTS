import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// hola y 16:32
export default class CRC {
    canvas: HTMLElement;
    renderer: THREE.WebGLRenderer;
    camera: any; //THREE.PerspectiveCamera | THREE.OrthographicCamera;
    scene: THREE.Scene;
    controls: OrbitControls;

    axesHelper: THREE.AxesHelper;

    constructor(canvaId: string, cameraId: string = 'Perspective') {
        this.canvas = document.getElementById(canvaId) as HTMLElement;
        // this.canvas = document.querySelector('#webgl') as HTMLElement
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
        // this.canvas.appendChild( this.renderer.domElement );
        // const innerHeight = this.canvas.clientHeight, innerWidth = this.canvas.clientWidth;
        const innerHeight = window.innerHeight, innerWidth = window.innerWidth;
        this.renderer.setClearColor("#000");
        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;

        if (cameraId == "Orthographic" ) this.camera = new THREE.OrthographicCamera(-2.1, 2.1, 2.1, -2.1,0.1,100);
        else this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
        this.camera.position.set(9, 4, 9);
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        this.axesHelper = new THREE.AxesHelper()
        this.scene.add(this.axesHelper)

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();   
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))     
        })
    }    
}

