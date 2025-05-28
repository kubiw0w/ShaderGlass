#version 330 core
out vec4 FragColor;

in vec3 WorldPos;
in vec3 Normal;

uniform samplerCube skybox;
uniform vec3 cameraPos;

float random(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main()
{
    vec3 I = normalize(WorldPos - cameraPos);
    vec3 N = normalize(Normal); // u¿ywane tylko do refleksów

    float ratio = 1.00 / 1.52;

    // Dodaj zaszumion¹ wersjê normalnej tylko do refrakcji
    vec3 jitter = vec3(
        random(N.xy + 0.1),
        random(N.yz + 0.3),
        random(N.zx + 0.7)
    ) * 0.1;

    vec3 N_blurred = normalize(N + jitter); // rozmyta normalna

    // Refrakcja przez rozmyt¹ normaln¹
    vec3 refractedDir = refract(I, N_blurred, ratio);
    vec3 refraction = texture(skybox, refractedDir).rgb;

    // Refleksy przez czyst¹ normaln¹
    vec3 reflectedDir = reflect(I, N);
    vec3 reflection = texture(skybox, reflectedDir).rgb;

    float fresnel = pow(1.0 - dot(I, N), 1.0) * 0.05;

    vec3 color = mix(refraction, reflection, fresnel);

    float alpha = 0.5;

    FragColor = vec4(color, alpha);
}
