# Test the complete booking flow
function Test-ChatFlow {
    $baseUri = "http://localhost:8000/api/chat"
    
    # Test 1: Initial booking request
    Write-Host "=== Test 1: Booking Request ===" -ForegroundColor Cyan
    $json = @{messages = @(@{role = "user"; content = "I want to book a discovery call"})} | ConvertTo-Json
    $response1 = Invoke-WebRequest -Uri $baseUri -Method POST -ContentType "application/json" -Body $json -UseBasicParsing
    $text1 = $response1.Content.ToString().Trim()
    Write-Host "Bot: $text1`n" -ForegroundColor Green
    
    # Test 2: Provide name
    Write-Host "=== Test 2: User Provides Name ===" -ForegroundColor Cyan
    $json = @{messages = @(
        @{role = "user"; content = "I want to book a discovery call"}
        @{role = "assistant"; content = $text1}
        @{role = "user"; content = "Alice Smith"}
    )} | ConvertTo-Json -Depth 10
    Write-Host "Sending: $json" -ForegroundColor DarkGray
    $response2 = Invoke-WebRequest -Uri $baseUri -Method POST -ContentType "application/json" -Body $json -UseBasicParsing
    $text2 = $response2.Content.ToString().Trim()
    Write-Host "Bot: $text2`n" -ForegroundColor Green
    
    # Test 3: Provide email
    Write-Host "=== Test 3: User Provides Email ===" -ForegroundColor Cyan
    $json = @{messages = @(
        @{role = "user"; content = "I want to book a discovery call"}
        @{role = "assistant"; content = $text1}
        @{role = "user"; content = "Alice Smith"}
        @{role = "assistant"; content = $text2}
        @{role = "user"; content = "alice@company.com"}
    )} | ConvertTo-Json -Depth 10
    $response3 = Invoke-WebRequest -Uri $baseUri -Method POST -ContentType "application/json" -Body $json -UseBasicParsing
    $text3 = $response3.Content.ToString().Trim()
    Write-Host "Bot: $text3`n" -ForegroundColor Green
    
    # Test 4: Select time
    Write-Host "=== Test 4: User Selects Time ===" -ForegroundColor Cyan
    $json = @{messages = @(
        @{role = "user"; content = "I want to book a discovery call"}
        @{role = "assistant"; content = $text1}
        @{role = "user"; content = "Alice Smith"}
        @{role = "assistant"; content = $text2}
        @{role = "user"; content = "alice@company.com"}
        @{role = "assistant"; content = $text3}
        @{role = "user"; content = "2025-12-26T10:00:00"}
    )} | ConvertTo-Json -Depth 10
    $response4 = Invoke-WebRequest -Uri $baseUri -Method POST -ContentType "application/json" -Body $json -UseBasicParsing
    $text4 = $response4.Content.ToString().Trim()
    Write-Host "Bot: $text4`n" -ForegroundColor Green
    
    Write-Host "[OK] All tests completed successfully!" -ForegroundColor Cyan
}

Test-ChatFlow
