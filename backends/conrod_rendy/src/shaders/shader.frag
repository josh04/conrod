// NOTE: This shader requires being manually compiled to SPIR-V in order to
// avoid having downstream users require building shaderc and compiling the
// shader themselves. If you update this shader, be sure to also re-compile it
// and update `frag.spv`. You can do so using `glslangValidator` with the
// following command: `glslangValidator -V -o frag.spv shader.frag`

#version 450

layout(set = 0, binding = 0) uniform sampler2D t_TextColor;
layout(set = 0, binding = 1) uniform sampler2D t_ImgColor;

layout(location = 0) in vec2 v_Uv;
layout(location = 1) in vec4 v_Color;
layout(location = 2) flat in uint v_Mode;

layout(location = 0) out vec4 Target0;

void main() {

    vec4 trgt = vec4(0.0);
    // Text
    if (v_Mode == uint(0)) {
        trgt = v_Color * vec4(1.0, 1.0, 1.0, texture(t_TextColor, v_Uv).r);
        trgt = pow(trgt, vec4(0.4545));
    // Image
    } else if (v_Mode == uint(1)) {
        trgt = texture(t_ImgColor, v_Uv);

    // 2D Geometry
    } else if (v_Mode == uint(2)) {
        trgt = v_Color;
        trgt = pow(trgt, vec4(0.4545));
    }
    Target0 = pow(trgt, vec4(2.2));
}
