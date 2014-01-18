#version 120

uniform sampler2D albedoAndDepthMap;
uniform sampler2D normalMap;
uniform sampler2D positionMap;

uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform float lightRadius;

varying vec4 pos;

void main() {
	vec2 uv = pos.xy / pos.w * 0.5f + 0.5f;

	vec3 position = texture2D(positionMap, uv).rgb;

	vec3 localPosition = lightPosition - position;
	float distance = length(localPosition);
	if (distance > lightRadius) {
		discard;
	}

	vec3 strength = 1.0 - (vec3(distance) / lightRadius);

	vec3 albedo = texture2D(albedoAndDepthMap, uv).rgb;
	vec3 normal = texture2D(normalMap, uv).rgb;

	//float cost = dot(normal, localPosition);

	gl_FragColor = vec4(strength * lightColor, 1);
}