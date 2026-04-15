Add-Type -AssemblyName System.Drawing

function Compress-Image {
    param (
        [string]$source,
        [string]$destination,
        [int]$quality = 60
    )
    $img = [System.Drawing.Image]::FromFile((Join-Path (Get-Location) $source))
    $encoder = [System.Drawing.Imaging.Encoder]::Quality
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageDecoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, $quality)
    
    # Check if dimensions are extremely large and resize if needed (e.g. max width 1920)
    if ($img.Width -gt 1920) {
        $ratio = 1920.0 / $img.Width
        $newHeight = [int]($img.Height * $ratio)
        $bmp = New-Object System.Drawing.Bitmap($img, 1920, $newHeight)
        $bmp.Save((Join-Path (Get-Location) $destination), $codec[0], $encoderParams)
        $bmp.Dispose()
    } else {
        $img.Save((Join-Path (Get-Location) $destination), $codec[0], $encoderParams)
    }
    $img.Dispose()
}

Compress-Image -source "images\minos-illus.jpg" -destination "images\minos-illus-opt.jpg"
Compress-Image -source "images\Project 4.png" -destination "images\Project 4.jpg"
Compress-Image -source "images\Project 5.png" -destination "images\Project 5.jpg"
Compress-Image -source "images\Project 2.jpg" -destination "images\Project 2-opt.jpg"

Move-Item -Path "images\minos-illus-opt.jpg" -Destination "images\minos-illus.jpg" -Force
Move-Item -Path "images\Project 2-opt.jpg" -Destination "images\Project 2.jpg" -Force
