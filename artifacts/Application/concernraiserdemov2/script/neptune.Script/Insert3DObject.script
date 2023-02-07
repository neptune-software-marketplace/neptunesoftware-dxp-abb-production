// // This JavaScript file targets the RenderCanvas HTML element and imports 3D objects.
// // It uses the Babylon.js library. Before running the application please insert the html code of the HeaderText  
// // component into your Header in order to load the Babylon.js library. More information about
// // customizing your scenes and object visit https://www.babylonjs.com/
    
// const canvas = document.getElementById("renderCanvas"); // Get the canvas element
// const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
// var createScene = function () {
//     var scene = new BABYLON.Scene(engine);

//     // add a camera: https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction
//     var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
//     camera.attachControl(canvas, true);
	
// 	//Light direction is up and left: https://doc.babylonjs.com/divingDeeper/lights/lights_introduction
// 	var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
// 	light.diffuse = new BABYLON.Color3(1, .5, .25); //specify RGB colors!
// 	light.specular = new BABYLON.Color3(1, 0, 0);

//     /*
//      Choose how you want to import your 3d object
//     */
//     useBase64(scene);
//     //or
//     //usePublicGithubRepository(scene);

//     return scene;
// };

// //This is the main function!!!!
// const scene = createScene(); //Call the createScene function
// // Register a render loop to repeatedly render the scene
// engine.runRenderLoop(function () {
//         scene.render();
// });
// // Watch for browser/canvas resize events
// window.addEventListener("resize", function () {
//         engine.resize();
// });

// //***********    HELPER FUNCTIONS    ****************//

// //Take an object from a Neptune media url, encode it as base64 and render it on the scene
// //For more information about the media library visit:
// //https://community.neptune-software.com/documentation/media-library
// function useBase64(scene){
//     fetch("https://gtmdemosystem.neptune-software.cloud/media/root/3D/Engine.glb")
//     //or
//     //fetch("https://gtmdemosystem.neptune-software.cloud/media/root/3D/building.glb")
//     .then(data => {
//         data.blob() //make the hosted .glb file a blob: https://developer.mozilla.org/en-US/docs/Web/API/Blob
//             .then(blob => {
//                 var reader = new FileReader(); //instantiate a FileReader: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
//                 reader.readAsDataURL(blob);  // read the blob as a file
//                 reader.onloadend = function() { //this function is triggered when we call .readAsDataURL()
//                     var base64data = reader.result; //File Reader converts the blob to a base64 encoding 
//                     //This base64data has some extra information at the beginning. We cut it at the 38th index. 
//                     //console.log(base64data);
//                     //If you want to directly use a base64 encoded file, just replace base64data with your string!
//                     var base64_model_content = "data:base64," + base64data.slice(37); //This is the format expected by Babylon.js
//                     BABYLON.SceneLoader.Append("", base64_model_content, scene, function () { //Append the data to the scene
//                         scene.createDefaultCamera(true, true, true);
//                         model = scene.meshes[0];
//                     });
//                 }
//             });
//     })
// }

// //Get the object from a public Github.
// //Note that you must change the Github url. 
// //(1) add raw.githubusercontent (2) delete blob (3) put the file as an argument after the url
// //From
// //https://github.com/KhronosGroup/glTF-Sample-Models/blob/master/2.0/GearboxAssy/glTF-Binary/GearboxAssy.glb
// //to 
// //https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF-Binary/
// function usePublicGithubRepository(scene){
//         BABYLON.SceneLoader.ImportMesh(
//         "",
//         "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF-Binary/",
//         'GearboxAssy.glb',
//         scene,
//         function (meshes) {          
//             scene.createDefaultCameraOrLight(true, true, true);
//             scene.createDefaultEnvironment();
//     });
// }

