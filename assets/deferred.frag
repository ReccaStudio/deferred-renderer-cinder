#version 110

varying vec3 position;
varying vec3 normal;

uniform sampler2D albedoTexture;

void main() {
	vec2 uv = gl_TexCoord[0].st;
	vec4 color = texture2D(albedoTexture, uv);
	
	float depth = min(gl_FragCoord.z / gl_FragCoord.w * .0125f, 1);
	
	gl_FragData[0] = vec4(color.r, color.g, color.b, depth); // Color + depth
	gl_FragData[1] = vec4(normal, 1); // Normal
	gl_FragData[2] = vec4(position.xyz, 1); // Position
}